"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInFormData } from "@/app/_lib/schema";
import { useForm } from "react-hook-form";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import { redirect } from "next/navigation";
import { login } from "./actions";

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    // const res = await login(data);
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const res = await response.json();
    if (res.field === "success") {
      await login(data)
      onOpenChange();
      reset();
    }
    else {
      setResponseData(res.message || "An error occurred");
      setTimeout(() => {
        setResponseData(null);
      }, 3000);
      setLoading(false);
    }
    if (res.field === "username") {
      setError("username", {
        type: "server",
        message: res.message,
      });
    } else {
      console.error(res.message || "An error occurred.");
    }
    setLoading(false)
  };

  return (
    <>
      <Button onPress={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-3">
                    <Input
                      {...register("username")}
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Username"
                      placeholder="Enter your username"
                      variant="bordered"
                      isInvalid={!!errors.username}
                      errorMessage={errors.username?.message}
                    />
                    <Input
                      {...register("password")}
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message}
                    />
                  </div>
                  {responseData && (
                    <div className="flex justify-center mt-3 bg-red-600/60 rounded-md">
                      <p className="p-2">{responseData}</p>
                    </div>
                  )}
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" disabled={loading}>
                      {loading ? "Signing in..." : "Login"}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
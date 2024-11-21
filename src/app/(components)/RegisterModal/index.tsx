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
  User,
  AvatarIcon,
} from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";

// Zod schema for validation
const registerSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  // React Hook Form setup with Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        onOpenChange(); // Close the modal
        reset(); // Clear the form
      } else {
        // Check if the server error pertains to the username field
        if (responseData.field === "username") {
          setError("username", {
            type: "server",
            message: responseData.message,
          });
        } else if (responseData.field === "email") {
          setError("email", { type: "server", message: responseData.message });
        } else {
          console.error(responseData.message || "An error occurred.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="flat">
        Register
      </Button>
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
                      {...register("email")}
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      isInvalid={!!errors.email}
                      errorMessage={errors.email?.message}
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
                  {/* {responseData && (
                    <div className="flex justify-center mt-3 bg-red-600/60 rounded-md">
                      <p className="p-2">{responseData}</p>
                    </div>
                  )} */}
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" disabled={loading}>
                      {loading ? "Registering..." : "Register"}
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

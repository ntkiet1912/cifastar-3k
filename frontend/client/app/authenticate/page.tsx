"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { setToken, setUserInfo } from "@/services/localStorageService";
import { useAuthStore } from "@/store";
import { getMyInfo } from "@/services/customerService";
import { createPassword } from "@/services/authService";
import { CreatePasswordModal } from "@/components/create-password-modal";

export default function Authenticate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      fetch(
        `http://localhost:8080/api/theater-mgnt/auth/outbound/authenticate?code=${authCode}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          setToken(data.result?.token);
          login();

          try {
            const userInfo = await getMyInfo();
            setUserInfo(userInfo);
            if (userInfo.noPassword === true) {
              setShowCreatePassword(true);
            } else {
              setIsLoggedin(true);
            }
          } catch (error) {
            console.error("Failed to fetch user info:", error);
            setIsLoggedin(true);
          }
        })
        .catch((error) => {
          console.error("Authentication error:", error);
        });
    }
  }, [login]);

  useEffect(() => {
    if (isLoggedin) {
      router.push("/");
    }
  }, [isLoggedin, router]);

  const handleCreatePassword = async (
    password: string,
    confirmPassword: string
  ) => {
    try {
      await createPassword(password, confirmPassword);
      setShowCreatePassword(false);
      setIsLoggedin(true);
    } catch (error) {
      console.error("Failed to create password:", error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setShowCreatePassword(false);
    setIsLoggedin(true);
  };

  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="text-lg text-gray-700">Authenticating...</p>
      </div>

      <CreatePasswordModal
        isOpen={showCreatePassword}
        onClose={handleCloseModal}
        onSubmit={handleCreatePassword}
      />
    </>
  );
}

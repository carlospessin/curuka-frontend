import axios from "axios";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    try {
      await axios.post(`${API_URL}/register`, data);
      navigate("/login"); // 🔑 redireciona pelo router
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AuthLayout
      title="Criar conta"
      description="Preencha os campos abaixo para criar sua conta"
    >
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          {/* Nome */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={processing}
              placeholder="Nome Completo"
              required
            />
            <InputError message={errors.name} />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              disabled={processing}
              placeholder="email@example.com"
              required
            />
            <InputError message={errors.email} />
          </div>

          {/* Senha */}
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              disabled={processing}
              placeholder="Senha"
              required
            />
            <InputError message={errors.password} />
          </div>

          {/* Confirmação de senha */}
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirma senha</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) =>
                setData({ ...data, password_confirmation: e.target.value })
              }
              disabled={processing}
              placeholder="Confirma senha"
              required
            />
            <InputError message={errors.password_confirmation} />
          </div>

          {/* Erro geral */}
          {errors.general && (
            <div className="text-red-600 text-sm mb-2">{errors.general}</div>
          )}

          {/* Botão */}
          <Button type="submit" className="mt-2 w-full" disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Criar conta
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

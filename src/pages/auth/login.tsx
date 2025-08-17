import axios from "axios";
import { useState, FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

interface LoginProps {
  status?: string;
  canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword = true }: LoginProps) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      localStorage.setItem('auth_token', response.data.token);
      navigate('/dashboard'); // 🔑 usa router em vez de window.location
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message });
      }
    } finally {
      setProcessing(false);
      setData((d) => ({ ...d, password: "" })); // limpa senha
    }
  };

  return (
    <AuthLayout
      title="Acesse sua conta"
      description="Digite seu email e senha para entrar"
    >
      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="email@example.com"
              disabled={processing}
            />
            <InputError message={errors.email} />
          </div>

          {/* Senha */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              {canResetPassword && (
                <Link
                  to="/forgot-password"
                  className="ml-auto text-sm"
                  tabIndex={5}
                >
                  Esqueceu a senha?
                </Link>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Senha"
              disabled={processing}
            />
            <InputError message={errors.password} />
          </div>

          {/* Lembrar-me */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="remember"
              name="remember"
              checked={data.remember}
              onCheckedChange={(checked) =>
                setData({ ...data, remember: checked === true })
              }
              tabIndex={3}
              disabled={processing}
            />
            <Label htmlFor="remember">Lembrar-me</Label>
          </div>

          {/* Erro geral */}
          {errors.general && (
            <div className="text-red-600 text-sm mb-2">{errors.general}</div>
          )}

          {/* Botão */}
          <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Entrar
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Não tem uma conta?{" "}
          <Link to="/register" tabIndex={5}>
            <span className="text-orange-400">Criar conta</span>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

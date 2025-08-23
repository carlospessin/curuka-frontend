// src/pages/Dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground">Resumo e acesso rápido</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Gerenciar Perfis
                            </CardTitle>
                            <CardDescription>
                                Veja, edite ou exclua perfis criados
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" onClick={() => navigate('/profiles')}>
                                Gerenciar Perfis
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Cadastrar Perfil
                            </CardTitle>
                            <CardDescription>
                                Crie um novo perfil com informações de contato
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" onClick={() => navigate('/create-profile')}>
                                Criar Novo Perfil
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}

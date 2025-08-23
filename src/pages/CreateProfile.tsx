// src/pages/CreateProfile.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateProfileForm from '@/components/CreateProfileForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CreateProfile() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 mt-20">
                <div className="mb-8">
                    <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar ao Dashboard
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">Cadastrar Perfil</h1>
                    <p className="text-muted-foreground">Crie um novo perfil com informações de contato</p>
                </div>

                <CreateProfileForm />
            </main>
            <Footer />
        </div>
    );
}

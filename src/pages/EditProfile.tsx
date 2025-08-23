// src/pages/EditProfile.tsx
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EditProfileForm from '@/components/EditProfileForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditProfile() {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o ID da URL

    if (!id) return <p>Perfil não encontrado</p>; // proteção caso não tenha id

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/dashboard')}
                        className="mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar ao Dashboard
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">Editar Perfil</h1>
                    <p className="text-muted-foreground">Atualize suas informações pessoais</p>
                </div>

                <EditProfileForm profileId={Number(id)} />
            </div>
            <Footer />
        </div>
    );
}

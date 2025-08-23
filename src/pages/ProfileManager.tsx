// src/pages/ProfileManager.tsx
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Trash2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Profile {
    id: number;
    name: string;
    birthdate: string;
    is_active: boolean;
    slug: string;
}

export default function ProfileManager() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => { fetchProfiles(); }, []);

    const fetchProfiles = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const res = await axios.get('http://127.0.0.1:8000/api/profiles', {
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
            });
            setProfiles(res.data.data || []);
        } catch (err) {
            console.error(err);
            toast({ title: 'Erro', description: 'Não foi possível carregar perfis', variant: 'destructive' });
        } finally { setIsLoading(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Deseja realmente excluir este perfil?')) return;
        try {
            const token = localStorage.getItem('auth_token');
            await axios.delete(`http://127.0.0.1:8000/api/profiles/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setProfiles(profiles.filter(p => p.id !== id));
            toast({ title: 'Perfil excluído', description: 'O perfil foi removido.' });
        } catch (err) {
            toast({ title: 'Erro', description: 'Não foi possível excluir o perfil', variant: 'destructive' });
        }
    };

    const handleToggleActive = async (profile: Profile) => {
        try {
            const token = localStorage.getItem('auth_token');
            await axios.patch(`http://127.0.0.1:8000/api/profiles/${profile.id}`,
                { is_active: !profile.is_active },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProfiles(profiles.map(p => p.id === profile.id ? { ...p, is_active: !p.is_active } : p));
        } catch {
            toast({ title: 'Erro', description: 'Não foi possível atualizar status', variant: 'destructive' });
        }
    };

    const totalPages = Math.ceil(profiles.length / perPage);
    const currentProfiles = profiles.slice((currentPage - 1) * perPage, currentPage * perPage);

    if (isLoading) return <p>Carregando...</p>;

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8 mt-20">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Gerenciar Perfis</h1>
                    <Button onClick={() => navigate('/create-profile')}>Criar Perfil</Button>
                </div>

                {profiles.length === 0 ? (
                    <p>Nenhum perfil encontrado.</p>
                ) : (
                    <>
                        {currentProfiles.map(profile => (
                            <Card key={profile.id} className="mb-4">
                                <CardHeader className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>{profile.name}</CardTitle>
                                        <CardDescription>
                                            Nascimento: {format(new Date(profile.birthdate), 'dd/MM/yyyy')}
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Switch checked={profile.is_active} onCheckedChange={() => handleToggleActive(profile)} />
                                        <Button size="sm" variant="outline" onClick={() => navigate(`/edit-profile/${profile.id}`)}>
                                            <Settings className="h-4 w-4 mr-1" /> Editar
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(profile.id)}>
                                            <Trash2 className="h-4 w-4 mr-1" /> Excluir
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}

                        <div className="flex justify-center gap-2 mt-4">
                            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Anterior</Button>
                            <span className="px-2 flex items-center">{currentPage} / {totalPages}</span>
                            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Próxima</Button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

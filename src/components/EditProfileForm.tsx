// src/components/EditProfileForm.tsx
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, Plus, Trash2, Save, User } from 'lucide-react';
import { DatePicker } from './ui/date-picker';
import { format } from 'date-fns';


const contactSchema = z.object({
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    tipo: z.enum(['email', 'telefone']),
    valor: z.string().min(1, 'Valor é obrigatório'),
    principal: z.boolean().default(false),
    visivel: z.boolean().default(true),
});

const profileSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    dataNascimento: z.date({ required_error: 'Data de nascimento é obrigatória' }),
    contatos: z.array(contactSchema),
});


interface EditProfileFormProps {
    profileId: number;
}
export type EditProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfileForm({ profileId }: EditProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [initialData, setInitialData] = useState<EditProfileFormData | null>(null);

    const form = useForm<EditProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            nome: '',
            dataNascimento: new Date(),
            contatos: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'contatos',
    });


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const res = await fetch(`http://127.0.0.1:8000/api/profiles/${profileId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                const contatos = data.data.contacts?.map((c: any) => ({
                    descricao: c.description,
                    tipo: c.type === 'phone' ? 'telefone' : 'email',
                    valor: c.value,
                    principal: c.is_primary,
                    visivel: true,
                })) || [];

                const [year, month, day] = data.data.birthdate.split('-').map(Number);
                const birthdate = new Date(year, month - 1, day);
                birthdate.setHours(0, 0, 0, 0); // garante que seja 00:00

                form.reset({
                    nome: data.data.name,
                    dataNascimento: birthdate,
                    contatos,
                });

                console.log(birthdate);

                setInitialData({ nome: data.data.name, dataNascimento: new Date(year, month - 1, day), contatos });

            } catch (err) {
                console.error(err);
                toast({
                    title: 'Erro',
                    description: 'Não foi possível carregar perfil',
                    variant: 'destructive',
                });
            }
        };

        fetchProfile();
    }, [profileId]);


    const handleSaveProfile = async (data: EditProfileFormData) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            await fetch(`http://127.0.0.1:8000/api/profiles/${profileId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: data.nome,
                    birthdate: format(data.dataNascimento, 'yyyy-MM-dd'),
                }),
            });
            toast({ title: 'Perfil atualizado', description: 'Dados atualizados com sucesso' });
        } catch (err) {
            console.error(err);
            toast({ title: 'Erro', description: 'Não foi possível atualizar o perfil', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveContact = async (index: number) => {
        if (!profileId) return;

        try {
            const contato = form.getValues(`contatos.${index}`);
            const token = localStorage.getItem('auth_token');

            await fetch('http://127.0.0.1:8000/api/profile-contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    profile_id: profileId,
                    description: contato.descricao,
                    type: contato.tipo === 'telefone' ? 'phone' : 'email',
                    value: contato.valor,
                    is_primary: contato.principal,
                }),
            });

            toast({ title: 'Contato salvo', description: `${contato.descricao} atualizado com sucesso` });
        } catch (err) {
            console.error(err);
            toast({ title: 'Erro', description: 'Não foi possível salvar o contato', variant: 'destructive' });
        }

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" /> Dados do Perfil
                        </CardTitle>
                        <CardDescription>Edite as informações do perfil</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nome */}
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Completo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome completo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Data de Nascimento */}
                            <FormField
                                control={form.control}
                                name="dataNascimento"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Data de Nascimento</FormLabel>
                                        <DatePicker
                                            value={field.value instanceof Date ? field.value : undefined}
                                            onChange={(date: Date | undefined) => field.onChange(date)}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" /> {isLoading ? 'Salvando...' : 'Salvar Perfil'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Contatos */}
                <div className="mt-8 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contatos</CardTitle>
                            <CardDescription>Gerencie os contatos do perfil</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Contato {index + 1}</h4>
                                        {index > 0 && (
                                            <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Tipo */}
                                        <FormField
                                            control={form.control}
                                            name={`contatos.${index}.tipo`}
                                            render={({ field }) => {
                                                // Observe o tipo para cada campo individual
                                                const tipo = form.watch(`contatos.${index}.tipo`);
                                                return (
                                                    <FormItem>
                                                        <FormLabel>Tipo</FormLabel>
                                                        <Select
                                                            value={tipo} // usa o valor do watch
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                // Limpa os outros campos ao trocar o tipo
                                                                form.setValue(`contatos.${index}.descricao`, '');
                                                                form.setValue(`contatos.${index}.valor`, '');
                                                            }}
                                                        >
                                                            <SelectTrigger className="bg-white">
                                                                <SelectValue placeholder="Selecione o tipo" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-white">
                                                                <SelectItem value="email">Email</SelectItem>
                                                                <SelectItem value="telefone">Telefone</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Descrição */}
                                            <FormField
                                                control={form.control}
                                                name={`contatos.${index}.descricao`}
                                                render={({ field }) => {
                                                    const tipo = form.watch(`contatos.${index}.tipo`);
                                                    return (
                                                        <FormItem>
                                                            <FormLabel>Descrição</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={tipo === 'telefone' ? 'Telefone pessoal' : 'Email pessoal'}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            {/* Valor / Email ou Telefone */}
                                            <FormField
                                                control={form.control}
                                                name={`contatos.${index}.valor`}
                                                render={({ field }) => {
                                                    const tipo = form.watch(`contatos.${index}.tipo`);
                                                    return (
                                                        <FormItem>
                                                            <FormLabel>{tipo === 'telefone' ? 'Telefone' : 'Email'}</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={tipo === 'telefone' ? 'Ex: (99) 99999-9999' : 'Ex: joao@exemplo.com'}
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div className="flex gap-6">
                                            {/* Principal */}
                                            <FormField
                                                control={form.control}
                                                name={`contatos.${index}.principal`}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <FormLabel>Contato Principal</FormLabel>
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Visível */}
                                            <FormField
                                                control={form.control}
                                                name={`contatos.${index}.visivel`}
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <FormLabel>Visível</FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <Button type="button" variant="outline" onClick={() => handleSaveContact(index)}>
                                        <Save className="h-4 w-4 mr-2" /> Salvar Contato
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ descricao: '', tipo: 'email', valor: '', principal: false, visivel: true })}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Adicionar Contato
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </form>
        </Form>
    );
}


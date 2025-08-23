import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, Plus, Trash2, Save, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { DatePicker } from './ui/date-picker';

// schema contatos
const contactSchema = z.object({
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    tipo: z.enum(['email', 'telefone']),
    valor: z.string().min(1, 'Valor é obrigatório'),
    principal: z.boolean().default(false),
    visivel: z.boolean().default(true),
});

// schema perfil
const profileSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    dataNascimento: z.date({ required_error: 'Data de nascimento é obrigatória' }),
    ativo: z.boolean().default(true),
    contatos: z.array(contactSchema),
});

async function generateSlug(name: string) {
    const date = new Date().toISOString();
    const msgUint8 = new TextEncoder().encode(name + date); // converte para bytes
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // gera hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // converte para array de bytes
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.substring(0, 12); // pega os 12 primeiros caracteres
}

// tipagem
type ProfileFormData = z.infer<typeof profileSchema>;


export default function CreateProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [profileId, setProfileId] = useState<number | null>(null);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            nome: '',
            ativo: true,
            contatos: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'contatos',
    });


    // salvar perfil
    const handleCreateProfile = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("auth_token");
            const slug = await generateSlug(data.nome);

            const res = await axios.post(
                "http://127.0.0.1:8000/api/profiles",
                {
                    name: data.nome,
                    birthdate: format(data.dataNascimento, "yyyy-MM-dd"),
                    slug: slug,
                    type: "child", // fixo por enquanto
                    is_active: data.ativo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            setProfileId(res.data.id);

            toast({
                title: 'Perfil criado',
                description: 'Agora você pode adicionar contatos.',
            });
        } catch (err) {
            console.error(err);
            toast({
                title: 'Erro',
                description: 'Não foi possível criar o perfil.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // salvar contato
    const handleSaveContact = async (index: number) => {
        if (!profileId) return;

        try {
            const contato = form.getValues(`contatos.${index}`);
            const token = localStorage.getItem("auth_token");

            await axios.post(
                "http://127.0.0.1:8000/api/profile-contacts",
                {
                    profile_id: profileId,
                    description: contato.descricao,
                    type: contato.tipo === 'telefone' ? 'phone' : 'email',
                    value: contato.valor,
                    is_primary: contato.principal,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );

            toast({
                title: 'Contato salvo',
                description: `${contato.descricao} adicionado com sucesso.`,
            });
        } catch (err) {
            console.error(err);
            toast({
                title: 'Erro',
                description: 'Não foi possível salvar o contato.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateProfile)} className="space-y-8">
                {/* Card Perfil */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Dados Básicos
                        </CardTitle>
                        <CardDescription>
                            Informações básicas do perfil
                        </CardDescription>
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
                                            <Input placeholder="Digite o nome completo" {...field} />
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
                                        <DatePicker value={field.value} onChange={field.onChange} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Status Ativo – só mostra depois que o perfil já existe */}
                        {profileId && (
                            <FormField
                                control={form.control}
                                name="ativo"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Perfil Ativo</FormLabel>
                                            <div className="text-sm text-muted-foreground">
                                                Ativar ou desativar este perfil
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}

                    </CardContent>
                </Card>

                {/* Botão salvar perfil */}
                {!profileId && (
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            <Save className="h-4 w-4 mr-2" />
                            {isLoading ? 'Salvando...' : 'Criar Perfil'}
                        </Button>
                    </div>
                )}
            </form>

            {/* Contatos só aparecem após criar perfil */}
            {profileId && (
                <div className="mt-8 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contatos</CardTitle>
                            <CardDescription>
                                Adicione informações de contato para este perfil
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Contato {index + 1}</h4>
                                        {index > 0 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`contatos.${index}.descricao`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Email do trabalho" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`contatos.${index}.tipo`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione o tipo" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="email">Email</SelectItem>
                                                            <SelectItem value="telefone">Telefone</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`contatos.${index}.valor`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Valor</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={
                                                                form.watch(`contatos.${index}.tipo`) === 'email'
                                                                    ? 'email@exemplo.com'
                                                                    : '(11) 99999-9999'
                                                            }
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex gap-6">
                                        <FormField
                                            control={form.control}
                                            name={`contatos.${index}.principal`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormLabel>Contato Principal</FormLabel>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`contatos.${index}.visivel`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormLabel>Visível</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleSaveContact(index)}
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        Salvar Contato
                                    </Button>
                                </div>
                            ))}

                            <Button type="button" variant="outline" onClick={() => addContact()} className="w-full">
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar Contato
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Form>
    );
}

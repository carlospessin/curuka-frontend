// src/components/ContactList.tsx
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Trash2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EditProfileFormData } from './EditProfileForm';

interface ContactListProps {
    form: UseFormReturn<EditProfileFormData>;
    handleSaveContact: (index: number) => void;
    removeContact: (index: number) => void;
}

const ContactList: FC<ContactListProps> = ({ form, handleSaveContact, removeContact }) => {
    const { fields } = form.control._getFieldArray('contatos'); // pega os campos do fieldArray

    return (
        <div className="space-y-2">
            {fields.map((field, index) => {
                const tipo = form.watch(`contatos.${index}.tipo`);

                return (
                    <div key={field.id} className="flex flex-wrap md:flex-nowrap items-center gap-2 border rounded-lg p-2">
                        {/* Tipo */}
                        <Select
                            value={tipo}
                            onValueChange={(value) => {
                                form.setValue(`contatos.${index}.tipo`, value);
                            }}
                            className="w-24"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="telefone">Telefone</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Descrição */}
                        <Input
                            placeholder={tipo === 'telefone' ? 'Telefone pessoal' : 'Email pessoal'}
                            {...form.register(`contatos.${index}.descricao`)}
                            className="flex-1"
                        />

                        {/* Valor */}
                        <Input
                            placeholder={tipo === 'telefone' ? '(99) 99999-9999' : 'joao@exemplo.com'}
                            {...form.register(`contatos.${index}.valor`)}
                            className="flex-1"
                        />

                        {/* Principal */}
                        <div className="flex items-center space-x-1">
                            <Switch
                                checked={form.watch(`contatos.${index}.principal`)}
                                onCheckedChange={(val) => form.setValue(`contatos.${index}.principal`, val)}
                            />
                            <span className="text-sm">Principal</span>
                        </div>

                        {/* Visível */}
                        <div className="flex items-center space-x-1">
                            <Switch
                                checked={form.watch(`contatos.${index}.visivel`)}
                                onCheckedChange={(val) => form.setValue(`contatos.${index}.visivel`, val)}
                            />
                            <span className="text-sm">Visível</span>
                        </div>

                        {/* Botões */}
                        <div className="flex items-center gap-1">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleSaveContact(index)}
                            >
                                <Save className="h-4 w-4 mr-1" /> Salvar
                            </Button>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeContact(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ContactList;

'use client';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { FormElementProps, FormElementWrapper } from './wrapper';
import { ChevronsUpDown } from 'lucide-react';
import { FaX } from 'react-icons/fa6';
import { cn, getProperty } from '@/lib/utils';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface DropdownFormElementProps<V, T extends FieldValues> extends FormElementProps<T> {
    values: V[];
    onChange?: (newValue: V, added: boolean) => void;
    className?: string;
    displayValue?: (value: V) => string;
    getKeyOfValue?: (value: V) => string;
}

export function DropdownManyFormElement<V, T extends FieldValues>({
    form,
    label,
    name,
    values,
    displayValue = (value: V) => value as string,
    getKeyOfValue = (value: V) => value as string,
    onChange,
    className
}: DropdownFormElementProps<V, T>) {
    const [selected, setSelected] = useState<V[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (buttonRef.current) {
            let target = buttonRef.current;
            target.style.height = 'inherit';
            target.style.height = `${target.scrollHeight}px`;
        }
    }, [selected]);

    function onRemove(value: V) {
        const newSelected = selected.filter((v) => getKeyOfValue(v) !== getKeyOfValue(value));

        setSelected(newSelected);

        form.setValue(name, newSelected as PathValue<T, Path<T>>);
    }

    return (
        <FormElementWrapper
            className={className}
            form={form}
            name={name}
            label={label}
            son={(field) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className="flex w-full justify-between min-h-12 hover:has-[.prevent-hover:hover]:bg-box-background"
                            ref={buttonRef}
                        >
                            <PillList
                                values={getProperty(form.getValues(), name)}
                                displayValue={displayValue}
                                getKeyOfValue={getKeyOfValue}
                                onRemove={onRemove}
                            />
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Command>
                            <CommandInput placeholder={`Sélectionner ${label}...`} />
                            <CommandList>
                                <CommandEmpty>Entrée invalide.</CommandEmpty>
                                <CommandGroup>
                                    {values.map((value) => (
                                        <CommandItem
                                            key={getKeyOfValue(value)}
                                            value={getKeyOfValue(value)}
                                            onSelect={(newKey) => {
                                                const newValue = values.find(
                                                    (v) => getKeyOfValue(v) === newKey
                                                )!;

                                                const included = selected.includes(newValue);

                                                if (onChange) {
                                                    onChange(newValue, !included);
                                                }

                                                const newSelected = included
                                                    ? selected.filter((v) => v !== newValue)
                                                    : [...selected, newValue];

                                                setSelected(newSelected);

                                                form.setValue(
                                                    name,
                                                    newSelected as PathValue<T, Path<T>>
                                                );
                                                // console.log(
                                                //     name,
                                                //     newValue,
                                                //     newSelected,
                                                //     form.getValues()
                                                // );
                                            }}
                                        >
                                            <Checkbox
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    selected.includes(value)
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                                checked={selected.includes(value)}
                                            />
                                            {displayValue(value)}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        />
    );
}

interface PillListProps<V> {
    values: V[];
    displayValue: (value: V) => string;
    getKeyOfValue: (value: V) => string;
    onRemove: (value: V) => void;
}
function PillList<V>({ values, displayValue, getKeyOfValue, onRemove }: PillListProps<V>) {
    return (
        <div className="flex flex-wrap items-center gap-1 h-full">
            {values.map((value) => (
                <Pill
                    key={getKeyOfValue(value)}
                    value={displayValue(value)}
                    onRemove={(e) => {
                        e.preventDefault();
                        onRemove(value);
                    }}
                />
            ))}
        </div>
    );
}

function Pill({ value, onRemove }: { value: string; onRemove: (e: MouseEvent) => void }) {
    return (
        <div className="flex justify-between items-center bg-background rounded-full border h-7">
            <span className="mx-2 py-1">{value}</span>
            <FaX
                className="prevent-hover h-7 w-7 py-1.5 pl-1 pr-2 rounded-r-full cursor-pointer text-input border-l border-t border-b hover:text-foreground"
                onClick={onRemove}
            />
        </div>
    );
}

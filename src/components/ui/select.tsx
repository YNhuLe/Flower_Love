import { useState, useRef } from "react";
import {
    useFloating, useClick, useDismiss, useRole, useListNavigation, useInteractions, FloatingPortal, FloatingFocusManager, offset, flip, size, autoUpdate
} from "@floating-ui/react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
    label?: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

/**
 * 
 * @param param0 label, options, value, onChange, placeholder, className
 * @description This component is a custom select dropdown that allows users to select an option from a list. It uses the @floating-ui/react library for positioning and managing the dropdown behavior. 
 * The component supports keyboard navigation, click outside to dismiss, and accessibility features.
 * @returns dropdown menu with options that can be selected by clicking or using keyboard navigation. 
 * The selected option is displayed in the input field, and the dropdown can be opened and closed by clicking on the input field.
 */

function Select({
    label, options, value, onChange, placeholder = "", className = ""
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const listRef = useRef<Array<HTMLElement | null>>([]);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        placement: "bottom-start",
        middleware: [
            offset(4), flip(), size({
                apply({ rects, elements }) {
                    Object.assign(elements.floating.style, {
                        minWidth: `${rects.reference.width}`,
                    })
                }
            })
        ]

    })

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });
    const listNav = useListNavigation(context, {
        listRef, activeIndex, onNavigate: setActiveIndex, loop: true,
    });
    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
        click, dismiss, role, listNav
    ]);


    return (
        <div
            ref={refs.setReference}
            {...getReferenceProps()}
            className={` px-3 py-2 border  rounded-md  text-xs cursor-pointer select-none flex justify-between ${className}`}

        >
            {placeholder && !value ? <span className="text-[.65rem] text-text-muted/70">{placeholder}</span> : <span>{value}</span>}
            <ChevronDown className="w-3 h-3" />

            {
                isOpen && (
                    <FloatingPortal>

                        <FloatingFocusManager context={context} modal={false}>

                            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}

                                className="bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden"
                            >
                                {
                                    options.map((option, i) => (
                                        <div key={option} ref={(node) => (
                                            listRef.current[i] = node
                                        )}

                                            {...getItemProps({
                                                onClick: () => {
                                                    onChange(option);
                                                    setIsOpen(false);
                                                },
                                            })}
                                            className={`px-3 py-2 text-xs cursor-pointer hover:bg-text-muted/30 ${option === value ? "bg-text-inverse text-xxs" : ""
                                                }`}
                                        >{option}

                                        </div>
                                    ))
                                }
                            </div>
                        </FloatingFocusManager>

                    </FloatingPortal>
                )
            }
        </div>
    )
}

export default Select;
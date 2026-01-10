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
}

function Select({
    label, options, value, onChange, className = ""
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
            className={`px-3 py-2 border  rounded-md  text-xs cursor-pointer select-none flex gap-1 ${className}`}

        >{value} 
        <ChevronDown className="w-5 h-5"/>

            {
                isOpen && (
                    <FloatingPortal>

                        <FloatingFocusManager context={context} modal={false}>

                            <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps}

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
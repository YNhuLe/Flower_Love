import { ShoppingCart } from "lucide-react";
import { GiftBoxLine, formatCents } from "../../hooks/useGiftBox";

interface GiftBoxSummaryProps {
    lines: GiftBoxLine[];
    totalItems: number;
    subtotalCents: number;
    packagingCents: number;
    totalCents: number;
    validationMessage: string | null;
    submitError: string | null;
    isSubmitting: boolean;
    onRemoveItem: (giftId: number) => void;
    onAddToCart: () => void;
}

function GiftBoxSummary({
    lines, totalItems, subtotalCents, packagingCents, totalCents,
    validationMessage, submitError, isSubmitting, onRemoveItem, onAddToCart,
}: GiftBoxSummaryProps) {
    const message = submitError ?? (totalItems > 0 ? validationMessage : null);

    return (
        <aside className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-7 lg:sticky lg:top-6">
            <h2 className="mb-6 text-2xl font-bold text-stone-900">Your Gift Box</h2>

            {lines.length === 0 ? (
                <p className="text-stone-500">Your box is empty — pick something to get started.</p>
            ) : (
                <ul className="divide-y divide-stone-200">
                    {lines.map(({ item, quantity, lineTotalCents }) => (
                        <li key={item.gift_id} className="flex items-center justify-between py-4">
                            <div>
                                <p className="text-lg text-stone-900">{item.name}</p>
                                <p className="text-sm text-stone-500">
                                    Qty: {quantity}
                                    <button
                                        onClick={() => onRemoveItem(item.gift_id)}
                                        className="ml-3 text-xs underline hover:text-stone-800"
                                    >
                                        Remove one
                                    </button>
                                </p>
                            </div>
                            <p className="text-lg font-semibold text-amber-700">{formatCents(lineTotalCents)}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-4 space-y-2 border-t border-stone-300 pt-4">
                <div className="flex justify-between text-lg">
                    <span className="text-stone-600">Items ({totalItems})</span>
                    <span className="font-semibold text-stone-900">{formatCents(subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-lg">
                    <span className="text-stone-600">Gift Box & Packaging</span>
                    <span className="font-semibold text-stone-900">{formatCents(packagingCents)}</span>
                </div>
                <div className="flex justify-between pt-1 text-xl font-bold text-stone-900">
                    <span>Total</span>
                    <span>{formatCents(totalCents)}</span>
                </div>
            </div>

            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

            <button
                onClick={onAddToCart}
                disabled={!!validationMessage || isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-amber-600 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <ShoppingCart className="h-5 w-5" />
                {isSubmitting ? "Adding…" : "Add Gift Box to Cart"}
            </button>
        </aside>
    );
}

export default GiftBoxSummary;
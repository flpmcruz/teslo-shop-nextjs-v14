'use client'
import { useState } from "react"
import clsx from "clsx"
import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart)

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)

    const addToCart = () => {
        if (!size) return alert('Selecciona una talla')

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images[0],
            size,
            quantity,
        }

        addProductToCart(cartProduct)
        setQuantity(1)
        setSize(undefined)
    }

    return (
        <>
            <span className={
                clsx("mt-2 text-red-500", { "block fade-in": size !== undefined, "hidden": size !== undefined })
            }>Debe seleccionar una talla</span>

            {/* Selector de Tallas */}
            <SizeSelector
                onSizeChanged={setSize}
                selectedSize={size}
                availableSizes={product.sizes}
            />

            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Boton de agregar al carrito */}
            <button className="btn-primary my-5"
                onClick={addToCart}
            >
                Agregar al carrito
            </button>
        </>
    )
}

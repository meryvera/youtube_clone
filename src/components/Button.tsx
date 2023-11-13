import { VariantProps, cva } from "class-variance-authority"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary",
      ],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  }
})

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">
// Define un nuevo tipo ButtonProps. Este tipo COMBINA las propiedades inferidas de buttonStyles (usando VariantProps) con las propiedades nativas del elemento <button> de HTML (usando ComponentProps).
// El elemento <button> de HTML tiene una serie de propiedades (atributos) nativas. Algunas de las más comunes son:
// disabled
// type: Define el tipo de botón. Puede tener valores como "button", "submit" o "reset".
// disabled: Un booleano que, cuando está presente, desactiva el botón para que no se pueda interactuar con él.
// form: Asocia el botón con un formulario específico mediante el ID del formulario.
// name: Especifica el nombre del botón, útil cuando el botón es parte de un formulario.
// value: Define el valor del botón cuando se utiliza dentro de un formulario.
// autofocus: Si está presente, el navegador intentará enfocar este botón automáticamente al cargar la página.
// onclick: Un manejador de eventos que se activa cuando se hace clic en el botón.

// esta combinación asegura que mientras personalizas y mejoras la apariencia y el comportamiento del botón con Tailwind y otras utilidades, no pierdes la funcionalidad y comportamiento estándar que los botones HTML ofrecen de forma nativa

export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button 
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
    // Desestructuras las propiedades variant, size y className del objeto de propiedades entrante, y agrupas el resto de propiedades en ...props

    // El componente renderiza un botón con sus propiedades y clases combinadas usando twMerge

    // En este componente Button, el propósito de className es permitir que los usuarios del componente añadan o sobreescriban las clases generadas por twMerge(buttonStyles({ variant, size }), className). Así, si alguien quiere agregar una clase adicional o modificar el comportamiento visual del botón en un caso específico, puede hacerlo pasando su propia className al componente.
    
    // En el componente Button, al hacer ...props, estás recogiendo todas las propiedades que no son variant, size, ni className. Esto significa que cualquier otra propiedad que se pase al componente Button (como onClick, disabled, type, etc.) se propagará directamente al elemento <button> subyacente.
  )
}



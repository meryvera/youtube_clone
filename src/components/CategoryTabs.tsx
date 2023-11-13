import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillsProps = {
  categories: string[],
  selectedCategory: string,
  onSelect: (category: string) => void
}

const TRANSLATE_AMOUNT = 200;

export function CategoryTabs({categories, selectedCategory, onSelect}:CategoryPillsProps) {
  console.log('cateogrieees', categories);

  const [translate, setTranslate] = useState(300)
  const [isLeftVisible, setIsLeftVisible] = useState(true)
  const [isRightVisible, setIsRightVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  // useRef: Hook que te permite persistir valores entre renders sin causar una actualización del renderizado del componente
  // useRef: Devuelve un objeto ref mutable cuya propiedad .current se inicializa con el argumento pasado (initialValue). El objeto devuelto se mantendrá persistente durante la vida completa del componente.

  //useRef<HTMLDivElement>(null): Este es el uso del Hook useRef. Estás inicializando la referencia con null, lo que significa que inicialmente no apunta a ningún elemento del DOM. El tipo genérico <HTMLDivElement> es una anotación de TypeScript que especifica que la referencia está destinada a apuntar a un elemento div en el DOM. Esto es útil para el tipado estático y el autocompletado en TypeScript, ya que proporciona información sobre el tipo de elemento al que la referencia puede apuntar.
  
  // Después de que el componente se haya montado, containerRef.current contendrá una referencia al elemento div y podrás interactuar con él directamente usando métodos del DOM. Por ejemplo, podrías cambiar el tamaño, enfocar o leer propiedades como la altura y el ancho.

  // Es importante mencionar que, a diferencia de la función useState, cambiar la propiedad .current de la referencia no causará que el componente se vuelva a renderizar. Esto lo hace útil para ciertos casos de uso en los que deseas tener acceso a un valor mutable que no está vinculado al ciclo de vida del renderizado.
  useEffect(() => {
    if (containerRef.current == null) return

    const observer = new ResizeObserver(entries => {
      const container = entries[0]?.target
      if (container == null) return
      setIsLeftVisible(translate > 0)
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      )
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [categories, translate])

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      {/* relative: hace que el absolute de los tabs hijos sean relativos a la position de este div padre*/}
      {/* absolute: esta clase permite que los elementos hijos que tienen una posición absolute se posicionen en relación con el elemento padre más cercano que tiene una posición no estática (en este caso, relative)*/}
      {/* overflow-x-hidden: hace que el overflow-x sea hidden, es decir, que no se vea el scroll horizontal <- ->*/}
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}>
        {/* whitespace-nowrap:  Esta clase impide que el texto dentro del div pase a una nueva línea, forzando a que todo el contenido se quede en una sola línea horizontal.*/}
        {/* w-[max-content]: Esta es una clase de utilidad de Tailwind que aplica un ancho al div basado en el contenido interno máximo que pueda tener. Significa que el ancho del div será tan ancho como el elemento más ancho dentro de él. En este caso, el ancho del div será tan ancho como el texto que tenga dentro.*/}
        {categories.map( category => (
          <Button 
            key={category}
            onClick={() => onSelect(category)}
            variant={selectedCategory === category ? "dark" : 'default'}
            className="py-1 px-3 rounded-lg whitespace-nowrap">
            {category}
          </Button>
        ))}
      </div>

      {isLeftVisible && 
      (<div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
        <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate(translate => {
                // if (containerRef.current == null) {
                //   return translate
                // }
                const newTranslate = translate - TRANSLATE_AMOUNT
                // const edge = containerRef.current.scrollWidth
                // const width = containerRef.current.clientWidth
                if (newTranslate <= 0) return 0
                return newTranslate
              })
            }}>
          <ChevronLeft/>
        </Button>  
      </div>)}

      {isRightVisible && 
      (<div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
        <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => (
              setTranslate(translate => {
                if (containerRef.current == null) return translate
                const newTranslate = translate + TRANSLATE_AMOUNT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                if (newTranslate + width >= edge) {
                  return edge - width
                }
                return newTranslate
              })
            )}>
          <ChevronRight/>
        </Button>  
      </div>)}
    </div>
  )
}




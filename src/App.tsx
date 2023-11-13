import { PageHeader } from "./layouts/PageHeader";
import { CategoryTabs } from "./components/CategoryTabs";
import { categories, videos } from "./data/home";
import { useState } from "react";
import { VideoGridItem } from "./components/VideoGridItem";
import { Sidebar } from "./layouts/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";


export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader/>

        <article className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          {/* grid-cols-[auto,1fr]: Define una cuadrícula con dos columnas donde la primera columna tiene un ancho automático (auto) que se ajusta al contenido de la celda, y la segunda columna ocupa el espacio restante (1fr es una fracción del espacio disponible). 

          overflow-auto: Esta clase permite que el contenido que excede el tamaño del contenedor se desplace automáticamente. Si hay más contenido del que puede caber en el espacio asignado, se mostrarán barras de desplazamiento para que los usuarios puedan ver el contenido adicional al desplazarse.

          flex-grow es una propiedad que permite a un elemento crecer para llenar cualquier espacio adicional en su contenedor flex.
          */}
          <Sidebar />
          <section className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              {/* sticky top-0: cuando se haga scroll y el section llegue al top-0 del viewport, se quedara pegado en ese top-0 */}
              <CategoryTabs categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory}/>
            </div>

            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {/* grid-cols-: Esto indica que vamos a definir cómo se deben organizar las columnas en nuestra "repisa" (o contenedor de cuadrícula).
              
              repeat(auto-fill, ...): Esto es como decir "llenar la repisa con tantas cajas como quepan".
              
              minmax(300px, 1fr): Cada caja tiene un ancho mínimo de 300 píxeles. Pero si hay espacio extra en la repisa después de que todas las cajas están alineadas lado a lado, queremos que se expandan para llenar ese espacio extra. El "1fr" es como un comodín que se estira para usar ese espacio extra: si hay un poco de espacio, cada caja se estira un poco; si hay mucho espacio, cada caja se estira más. */}
              {videos.map(video => (
                <VideoGridItem key={video.id} {...video}/>
              ))}
            </div>
          </section>
        </article>
      </div>
    </SidebarProvider>
  );
}
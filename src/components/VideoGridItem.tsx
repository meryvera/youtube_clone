import { useEffect, useRef, useState } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTimeAgo"

type VideoGridItemProps = {
  id: string,
  title: string,
  channel: {
    id: string
    name: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
}
const VIEW_FORMATTER = new Intl.NumberFormat(undefined, { notation: "compact" })

export function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoGridItemProps) {

  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current == null) return
    // si no hay un elemento de video para manipular por ello el efecto retorna temprano sin hacer nada más.
    // Esto es una buena práctica para asegurarse de que el elemento de video está presente antes de intentar llamar a sus métodos.

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      // Si isVideoPlaying es true, lo que ocurre cuando el usuario coloca el mouse sobre el ítem (onMouseEnter), el efecto establece el currentTime del video a 0 (es decir, lo rebobina al principio) y luego llama al método .play() en el elemento de video para empezar la reproducción.
    } else {
      videoRef.current.pause()
      // Si isVideoPlaying es false, lo que ocurre cuando el mouse sale del ítem (onMouseLeave), el efecto llama al método .pause() para pausar la reproducción del video.
    }
  }, [isVideoPlaying])
    // videoRef proporciona un acceso directo al elemento de video para que puedas controlar su reproducción programáticamente, y useEffect se utiliza para realizar la lógica de control de reproducción/pausa en respuesta a los eventos del mouse y los cambios de estado.

  return (
    <div 
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        {/* relative: Esta clase establece la propiedad CSS position del elemento a relative. Esto significa que el elemento se posicionará relativo a su ubicación normal en el flujo del documento. Permite que cualquier hijo posicionado absolutamente dentro de él se coloque en relación con este elemento.
        
        aspect-video: relación de anchura a altura común para videos, que es de 16:9. Esto es útil para contenedores que deben mantener una proporción específica, lo que es común para los reproductores de video y las imágenes.  */}
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        {/* object-cover: Asegura que la imagen cubra completamente el área de su contenedor sin distorsionarse.
        
        rounded-xl: Esta clase se utiliza para aplicar un borde redondeado significativamente grande a todos los bordes del elemento.
        */}
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}/>
          {/* inset-0: This is shorthand for setting top: 0; right: 0; bottom: 0; left: 0;, which stretches the video to cover the entire space of its parent container. 
          
          transition-opacity duration-200: This applies a transition effect to the opacity property over 200 milliseconds. When the opacity changes, the transition will make the change appear smoothly rather than abruptly.
          
          opacity to 100% (fully visible) and adds a delay of 200 milliseconds to the transition after any changes are initiated. If isVideoPlaying is false, it sets the opacity to 0% (completely transparent), making the video invisible.
          */}
      </a>
      
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img className="w-12 h-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
      
    </div>
  )
}






import React, { useState, useEffect } from 'react'
import BaseURL from '../../server'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Database-driven props
  facultyId?: string // Fetch from faculty table
  studentId?: string // Fetch from student table
  type?: 'faculty' | 'student' // User type
  
  // Loading state
  showLoader?: boolean
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, alt, style, className, facultyId, studentId, type, showLoader = false, ...rest } = props
  
  const [didError, setDidError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(src)
  const [loading, setLoading] = useState(false)
  const [fallbackSrc, setFallbackSrc] = useState(ERROR_IMG_SRC)

  const handleError = () => {
    setDidError(true)
  }

  // Fetch image from API when facultyId or studentId is provided
  useEffect(() => {
    // If static src is provided, use it directly
    if (src) {
      setImageSrc(src)
      return
    }

    // Determine fetch URL based on props
    let fetchUrl: string | null = null
    
    if (facultyId) {
      fetchUrl = `${BaseURL}api/figma/imagewithfallback.php?type=faculty&id=${facultyId}`
    } else if (studentId) {
      fetchUrl = `${BaseURL}api/figma/imagewithfallback.php?type=student&id=${studentId}`
    } else if (type && (type === 'faculty' || type === 'student')) {
      // Generic type-based fetch (requires id in localStorage or context)
      const storedId = localStorage.getItem(`${type}Id`)
      if (storedId) {
        fetchUrl = `${BaseURL}api/figma/imagewithfallback.php?type=${type}&id=${storedId}`
      }
    }

    // Fetch from API
    if (fetchUrl) {
      setLoading(true)
      
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            // Use image_url if available, otherwise use fallback
            if (data.data.image_url) {
              setImageSrc(data.data.image_url)
            } else {
              setImageSrc(null)
              setDidError(true)
            }
            
            // Store fallback for error handling
            if (data.data.fallback) {
              setFallbackSrc(data.data.fallback)
            }
          } else {
            console.error('Failed to fetch image:', data.message)
            setDidError(true)
          }
        })
        .catch((error) => {
          console.error('Error fetching image:', error)
          setDidError(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [src, facultyId, studentId, type])

  // Show loader while fetching
  if (loading && showLoader) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-gray-100 ${className ?? ''}`}
        style={style}
        {...rest}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show fallback if error or no image
  if (didError || !imageSrc) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={fallbackSrc} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  // Show actual image
  return (
    <img src={imageSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

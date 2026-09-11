import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const ProductsContext = createContext({ products: [], loading: true, error: null })

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('[Products] Iniciando fetch a Supabase...')

    supabase
      .from('products_public')
      .select('*')
      .eq('active', true)
      .order('sort_order').order('created_at')
      .then(({ data, error }) => {
        if (error) {
          console.error('[Products] Error:', error.message)
          setError(error.message)
        } else {
          console.log(`[Products] ${data?.length ?? 0} productos recibidos:`, data?.map(p => p.id))
          setProducts(data ?? [])
        }
        setLoading(false)
      })
  }, [])

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => useContext(ProductsContext)

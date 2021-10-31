import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type List = {
  id: string
  test: string
  created_at: string
}

const HomePage = (): JSX.Element => {
  const [list, setList] = useState<List[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      // sampleテーブルから全カラムのデータをid順に取得
      // dataに入る型はそのままだとany[]となるため.from<T>で指定
      const { data, error } = await supabase.from<List>('test').select('*').order('id')

      if (error) {
        throw error
      }
      if (data) {
        setList(data)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // supabaseからデータを取得
    fetchData()
  }, [])

  if (loading) return <div>loading...</div>
  if (!list.length) return <div>missing data...</div>

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>TITLE</td>
            <td>CREATED_AT</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.test}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HomePage

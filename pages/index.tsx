import {Inter} from '@next/font/google'
import App from './../src/App'


const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (

        <div>
            <App/>
        </div>


    )

}
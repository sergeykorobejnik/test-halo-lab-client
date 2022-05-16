import axios, {AxiosError, AxiosResponse} from "axios";

interface IApi {
    readonly root: string
    api: {
        [key: string]: string
    }
    readonly routes: {
        products: string
        postProduct: string
    };
    apiGetCards(): Promise<object | string>
    apiPostCheapest(data: {[key: string]: string}): Promise<string | undefined>
}

const api: IApi = {
    root: "https://test-halo-lab.herokuapp.com",
    api: {
        products: "/api/products"
    },
    routes: {
        products: "/get-products",
        postProduct: "/post-product",
    },
    async apiGetCards(): Promise<object | string> {
        try {
            const {routes, root, api} = this
            const res: AxiosResponse = await axios.get(root + api.products + routes.products)
            return res.data
        } catch (e: any) {
            return e.message ? e.message : e.status
        }
    },

    async apiPostCheapest(data): Promise<string | undefined> {
        try {
            const {routes, root, api} = this
            console.log(root + api.products + routes.postProduct)
            const res: AxiosResponse = await axios.post(root + api.products + routes.postProduct, data)
        } catch (e: any) {
            return e.message
        }
    }
}

export {api}
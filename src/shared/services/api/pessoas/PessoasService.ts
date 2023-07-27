import { Environment } from "../../../environment";
import { Api } from "../api-config";

interface IListagemPessoa {
    id: number;
    email: string;
    cidadeId: number;
    nomeCompleto: string
};

interface IDetalhePessoa {
    id: number;
    email: string;
    cidadeId: number;
    nomeCompleto: string
};

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
        

        const { data, headers } = await Api.get(urlRelativa);

        // console.log(`data: ${data}`)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || 0 ),
            }
        }
        return new Error('Erro ao listar os registros!')
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao listar os registros!');
    }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
    try {
        const { data } = await Api.get(`/pessoas/${id}`)
        if (data) {
            return (data);
        }
        return new Error('Erro ao consultar o registro!')
    } catch (error) {
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro')
    }

};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<Number | Error> => {
    try {
        const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);
        if (data) {
            return (data.id);
        }
        return new Error('Erro ao criar o Registro!')
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o Registro!')
    }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
    try {
        await Api.put(`/pessoas/${id}`, dados);
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao atualizar o Registro!')
    }


};

const deleteById = async (id: Number): Promise<void | Error> => {
    try {
        await Api.delete(`/pessoas/${id}`)
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao apagar o Registro!')
    }
 };


export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}
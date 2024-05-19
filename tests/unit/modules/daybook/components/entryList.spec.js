import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import journal from "@/modules/daybook/store/journal";

import EntryList from "@/modules/daybook/components/EntryList.vue";
import { journalState } from "../../../mock-data/test-journal-state";

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Pruebas en el EntryList', () => {

    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                  mockRouter  
                },
                plugins: [store]
            }
        })
    })

    test('debe llamar el getEntriesByTerm sin termino y mostrar 2 entradas', ()=> {
        expect(wrapper.findAll('entry-stub').length).toBe(2)
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de llamar el getEntriesByTerm y filtrar las entradas', async() => {
        const input = wrapper.find('input')

        input.setValue('dos')

        expect(wrapper.findAll('entry-stub').length).toBe(2)
        
    })

    test('el botón de nuevo debe redireccionar a /new', () => {
        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
    })
})
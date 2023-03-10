import { shallowMount } from "@vue/test-utils";
import Home from '@/views/Home';

describe('Pruebas en el Home View', () => {

    test('debe de renderizar el componente correctamente', () => {
        const wrapper = shallowMount( Home )
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('hacer click en un boton debe de redireccionar a no-entry', () => {

        const mockRouter = {
            push: jest.fn()
        }


        const wrapper = shallowMount( Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')
        expect( mockRouter.push ).toHaveBeenCalledTimes({ name: 'no-entry' })
    })
})


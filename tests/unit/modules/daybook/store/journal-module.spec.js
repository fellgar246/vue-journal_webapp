import { createStore } from 'vuex'
import journal from "@/modules/daybook/store/journal"
import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Vuex - Pruebas en el journal-module', () => {
    test('este es el estado inicial, debe de tener este state', () => {
        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    test('mutation: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: '-MjGQ7Qb9lFVZjD7Xy3d',
            date: 1627077227978,
            text: "Hello world mock data",
        }

        store.commit('journal/updateEntry', updatedEntry)

        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(2)
        expect(storeEntries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    })

    test('mutation: addEntry y deleteEntry', () => {
        const store = createVuexStore(journalState)
        const newEntry = {
            id: 'ABC-123',
            date: 1627077227978,
            text: "Hola mundo"
        }

        store.commit('journal/addEntry', newEntry)

        let storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find(e => e.id === newEntry.id)).toBeTruthy()

        store.commit('journal/deleteEntry', newEntry.id)
        storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(2)
        expect(storeEntries.find(e => e.id === newEntry.id)).toBeFalsy()
    })

    test('getters: getEntriesByTerm y getEntryById', () => {
        const store = createVuexStore(journalState)
        const [ entry1, entry2 ] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('dos')).toEqual([entry2])

        expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1)
        
    })

    test('actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        await store.dispatch('journal/loadEntries')

        expect(store.state.journal.entries.length).toBe(1)
    })
})
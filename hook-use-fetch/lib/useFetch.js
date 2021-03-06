var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useReducer, useEffect } from 'react';
import { reducer } from './utils';
export function useFetch(query, dependencies) {
    const [state, dispatch] = useReducer(reducer, { fetchState: 'loading', result: undefined });
    useEffect(() => { executeQuery(query, dispatch); }, dependencies);
    return [state.fetchState, state.result];
}
const executeQuery = (query, dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: 'LOADING' });
        if (!query) {
            return;
        }
        const raw = yield fetch(query);
        if (!raw.ok) {
            dispatch({ type: 'ERROR', error: raw });
            return;
        }
        const response = yield raw.json();
        dispatch({ type: 'LOADED', response });
    }
    catch (error) {
        dispatch({ type: 'ERROR', error });
    }
});

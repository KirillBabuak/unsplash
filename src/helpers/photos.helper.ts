import {getItem, updateLSValue} from "./localstorage.helper";
import LS from "../constants/localstorage.constants";
import {MAX_COUNT_SEARCH_RESULTS} from "../constants/photos.constants";

export const getSearchResults = (): string[] => {
    const searchResults = getItem(LS.searchResults);

    return (searchResults || []) as string[];
};

export const updateSearchResults = (newText: string): void => {
    const searchResults = getSearchResults();

    if (!newText || searchResults.includes(newText)) {
        return;
    }

    if (searchResults.length < MAX_COUNT_SEARCH_RESULTS) {
        searchResults.unshift(newText);
        updateLSValue(LS.searchResults, JSON.stringify(searchResults))
        return;
    }

    searchResults.pop();
    searchResults.unshift(newText);
    updateLSValue(LS.searchResults, JSON.stringify(searchResults))
};

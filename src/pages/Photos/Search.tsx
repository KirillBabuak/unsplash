import React, {useState} from 'react';
import {Input, AutoComplete, SelectProps} from 'antd';
import {useDispatch} from "react-redux";
import {setSearch} from '../../reducers/photos.reducer';
import {getSearchResults, updateSearchResults} from "../../helpers/photos.helper";

const Search = (): JSX.Element => {
    const dispatch = useDispatch();
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [isShowRequests, setIsShowRequests] = useState<boolean>(false);

    const onSearch = (value: string, e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement> | undefined): void => {
        e?.stopPropagation() // it's need for prevent open search results
        onChangeShowRequest(false)

        dispatch(setSearch(value))

        updateSearchResults(value);
    };

    const onChangeShowRequest = (value: boolean) => {
        if (isShowRequests !== value) {
            setIsShowRequests(value)
        }
    }

    const setInputOptions = (): void => {
        const searchResults = getSearchResults();
        onChangeShowRequest(true);
        const optionsValues = searchResults.map((value, index) => ({key: index, value, label: value}))

        setOptions(optionsValues)
    }

    return <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{width: 300}}
        options={options}
        onFocus={setInputOptions}
        onChange={setInputOptions}
        onBlur={() => onChangeShowRequest(false)}
        open={isShowRequests}
    >
        <Input.Search size="large" placeholder="Search Photos" enterButton allowClear onSearch={onSearch}/>
    </AutoComplete>
}

export default Search;
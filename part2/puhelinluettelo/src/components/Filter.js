const Filter = (props) => {
    return(
<div>
Search: <input  onChange={props.handleSearch} />
</div>
    );
}

export default Filter;
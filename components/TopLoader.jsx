import LoadingBar from 'react-top-loading-bar'
const TopLoader = () => {
    return (
        <LoadingBar
            color="#2998ff"
            height={"4px"}
            progress={100}
            onLoaderFinished={0}
        />
    )
}
export default TopLoader

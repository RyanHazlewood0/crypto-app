import PropTypes from "prop-types";

export default function Coin({params})  {
return (
    <div>{params.coinId}</div>
)
}

Coin.propTypes = {
params: PropTypes.shape({
    coinId: PropTypes.string.isRequired
}).isRequired
};
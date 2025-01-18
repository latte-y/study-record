import PropTypes from 'prop-types';

export const InputStudy = (props) => {
    const { content, hour, onChange, onClick } = props; //分割代入

    return (
        <div>
            <div>
                <div>
                    <label>学習内容：</label>
                    <input type="text" name="content" value={content} onChange={onChange} />
                </div>
                <div>
                    <label>学習時間：</label>
                    <input type="number" min="0.1" step="0.1" name="hour" value={hour} onChange={onChange} />時間
                </div>
            </div>
            <div>
                <p>入力されている学習内容：{content}</p>
                <p>入力されている時間：{hour}</p>
            </div>
            <button onClick={onClick}>登録</button>
        </div>
    )
}

// // 型を定義
// InputStudy.propTypes = {
//     content: PropTypes.string.isRequired,
//     hour: PropTypes.number.isRequired,
//     onChange: PropTypes.func.isRequired, // onChange は関数型
//     onClick: PropTypes.func.isRequired, // onClick は関数型
// }

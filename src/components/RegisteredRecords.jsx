import PropTypes from 'prop-types';
import styled from 'styled-components';

export const RegisteredRecords = (props) => {
  const { records, onClickDelete } = props;

  return (
    <div>
      <h1>### 学習記録一覧 ###</h1>
      <ul>
        {records.map((record) => (
          <SLi key={record.id}>
            <strong>{record.title}</strong>: {record.time} hour
            {/* ボタンがレンダリングされた瞬間に onClickDelete(record.id) が実行される事を避けるため、「無名関数：() => ...」を用いる */}
            <SButton onClick={() => onClickDelete(record.id)}>削除</SButton>
          </SLi>
        ))}
      </ul>
    </div>
  );
};

// 型を定義
RegisteredRecords.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // レコードの一意のID
      title: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClickDelete: PropTypes.func.isRequired, // 削除関数
};

// スタイル定義
const SButton = styled.button`
  color: #fff;
  padding: 6px 16px;
  border: none;
  border-radius: 9999px;
  outline: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  background-color: #40514e;
  margin-left: 24px;
`;

const SLi = styled.li`
  margin: 8px 0;
`;

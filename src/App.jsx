import { useState, useEffect } from 'react';
import './App.css';
import { InputStudy } from './components/InputStudy';
import { RegisteredRecords } from './components/RegisteredRecords';
import { supabase } from './supabase'; // Supabaseクライアントをインポート

function App() {
  const [studyContent, setStudyContent] = useState("");
  const [studyHour, setStudyHour] = useState("");
  const [registeredRecords, setRegisteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // データ取得中の状態管理
  const [error, setError] = useState(false);

  const isInputAll = studyContent && studyHour;

  // Supabaseからデータを取得する関数
  const fetchRecords = async () => {
    setIsLoading(true); // ローディング開始
    setTimeout(async () => {
      const { data, error } = await supabase
        .from('study-record') // テーブル名
        .select('*'); // 全てのカラムを取得

      if (error) {
        console.error('Error fetching records:', error);
      } else {
        setRegisteredRecords(data); // データを状態にセット
      }
      setIsLoading(false); // ローディング終了
    }, 300); // 擬似的な遅延[ms]
  };

  // コンポーネントがマウントされたときにSupabaseからデータを取得
  useEffect(() => {
    fetchRecords(); // 初回レンダリング時にデータを取得
  }, []); // 空の依存配列で初回のレンダリング時のみ実行

  // recordを追加
  const onClickAdd = () => {
    if (!isInputAll) {
      setError(true);
      return;
    }

    const newRecord = {
      title: studyContent,
      time: parseFloat(studyHour), // 時間は数値として保存
    };

    const addRecord = async () => {
      const { error } = await supabase
        .from('study-record')
        .insert([newRecord]);

      if (error) {
        console.error('Error adding record:', error);
      } else {
        fetchRecords(); // 成功したらデータを再取得
      }
    };

    addRecord();

    setStudyContent(""); // 入力内容をリセット
    setStudyHour(""); // 入力内容をリセット
    setError(false);
  };

  // recordを削除
  const onClickDelete = (recordId) => {
    const deleteRecord = async () => {
      const { error } = await supabase
        .from('study-record')
        .delete()
        .eq('id', recordId); // 指定したIDで削除

      if (error) {
        console.error('Error deleting record:', error);
      } else {
        fetchRecords(); // 成功したらデータを再取得
      }
    };

    deleteRecord();
    setError(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "content") {
      setStudyContent(value);
    } else if (name === "hour") {
      setStudyHour(value);
    }
  };

  const totalStudyHours = registeredRecords.reduce((tmpSum, record) => {
    return tmpSum + record.time;
  }, 0);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> // データ取得中の表示
      ) : (
        <>
          <InputStudy
            content={studyContent}
            hour={studyHour}
            onChange={handleChange}
            onClick={onClickAdd}
          />
          {error && (
            <p style={{ color: "red" }}>
              全ての項目を入力してください！
            </p>
          )}
          <p>合計学習時間：{totalStudyHours} / 1000 [hours]</p>
          <RegisteredRecords
            records={registeredRecords}
            onChange={handleChange}
            onClickDelete={onClickDelete} // 削除関数を渡す
          />
        </>
      )}
    </>
  );
}

export default App;

const visitorModel = require('../model/visitorModel');

// 전체
const getvisitor = async (req, res) => {
    const getvisitor = await visitorModel.getAllvisitor();
    res.render("visitor", { getvisitor });
};

// 하나
const getvisitorOne = async (req, res) => {
  const getvisitorOne = await visitorModel.getOnevisitor(req.params.id);
  res.render("visitorOne", { getvisitorOne });
};

// 실제 등록
const createReal = async (req, res) => {
  try{
      const result = await visitorModel.postData(req.body);
      res.send('성공');
  } catch (error) {
      console.error("서버 오류:", error);
  }
};

// 삭제
const deleteData = async (req, res) =>{
  // console.log(req.params, "asb");
  await visitorModel.deleteRow(req.params.id);
  res.send('200');
}

// 수정페이지 이동
const moveWrite = async (req, res) =>{
  const getvisitorOne = await visitorModel.getOnevisitor(req.params.id);
  res.render('visitorwrite', {getvisitorOne});
}

// 데이터 업데이트
const dataUpdate = async (req, res) =>{
  // console.log(req.body, 'da')
  await visitorModel.updateRow(req.body);
  res.send(200);
}

// 테스트 등록하기
// const createTest = async (req, res) =>{
//   console.log(req.body);
//   const createData = await visitorModel.postData(req.body);
//   res.send('200');
// };

module.exports = { getvisitor, getvisitorOne, createReal, deleteData, moveWrite, dataUpdate };
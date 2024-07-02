import React, { useState } from 'react';
import '../../scss/FindIdPw.scss';
import { Grid } from '@mui/material';
import { Input, Label } from 'reactstrap';

const FindIdPw = () => {
  const [method, setMethod] = useState('p'); // 'p' for phone, 'e' for email
  const [view, setView] = useState('');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleViewChange = (type) => {
    setView(type);
  };

  return (
    <Grid className='findIdPwContainer'>
      <Grid className='findIdPwTitleBox'>
        <h1 className='findIdPwTitle'>아이디/비밀번호 찾기</h1>
      </Grid>

      <Grid className='list_tabs_wrap'>
        <a className='find_id' href='#' onClick={() => handleViewChange('id')}>
          아이디 찾기
        </a>
        <a className='find_pw' href='#' onClick={() => handleViewChange('pw')}>
          비밀번호 찾기
        </a>
      </Grid>

      {view === 'id' && (
        <Grid className='find_cont'>
          <Grid className='radio_wrap'>
            <p className='radio'>
              <Input
                checked={method === 'p'}
                id='phoneChk'
                name='methodChk'
                type='radio'
                value='p'
                onChange={handleMethodChange}
              />
              <Label for='phoneChk'>휴대전화로 찾기</Label>
            </p>
            <p className='radio'>
              <Input
                checked={method === 'e'}
                id='emailChk'
                name='methodChk'
                type='radio'
                value='e'
                onChange={handleMethodChange}
              />
              <Label for='emailChk'>이메일로 찾기</Label>
            </p>
          </Grid>

          <Grid className='find_id_input' id='divView1'>
            <input type='hidden' name='findType' value='id' />
            <input type='hidden' name='type' value={method} />
            <input type='hidden' name='findSeq' />
          </Grid>
          <Grid
            className='input_wrap'
            style={{ display: method === 'p' ? 'block' : 'none' }}
          >
            <input
              className='writePhone'
              type='text'
              name='phone'
              maxLength='11'
              placeholder='휴대전화번호 입력'
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
              }
            />
            <button type='button' className='white_mud_semi' id='phoneSend'>
              인증
            </button>
            {/* <p className='error_msg'>휴대전화번호를 확인하세요</p> */}
          </Grid>

          <Grid
            className='input_wrap'
            style={{ display: method === 'e' ? 'block' : 'none' }}
          >
            <input
              className='writeEmail'
              type='text'
              name='email'
              maxLength='50'
              placeholder='이메일 입력'
            />
            <button type='button' className='white_mud_semi' id='emailSend'>
              인증
            </button>
            {/* <p className='error_msg'>보조 이메일을 확인하세요</p> */}
          </Grid>

          <Grid className='button_row nopadding mt30px'>
            <button type='button' className='mud_semi common_btn'>
              로그인하러 가기
            </button>
            <button type='button' className='mud_main common_btn'>
              메인으로 가기
            </button>
          </Grid>
        </Grid>
      )}

      {view === 'pw' && (
        <Grid className='panel_wrap by_phone'>
          <fieldset>
            {/* <legend className='txt_hide'>아이디 휴대전화로 찾기</legend> */}

            <Grid
              className='input_wrap'
              style={{ display: method === 'p' ? 'block' : 'none' }}
            >
              <input
                className='writePhone'
                type='text'
                name='phone'
                maxLength='11'
                placeholder='휴대전화번호 입력'
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                }
              />
              <button type='button' className='white_mud_semi' id='phoneSend'>
                인증
              </button>
            </Grid>

            <Grid
              className='input_wrap'
              style={{ display: method === 'e' ? 'block' : 'none' }}
            >
              <input
                className='writeEmail'
                type='text'
                name='email'
                maxLength='50'
                placeholder='이메일 입력'
              />
              <button type='button' className='white_mud_semi' id='emailSend'>
                인증
              </button>
            </Grid>

            <Grid className='input_wrap authDiv' style={{ display: 'none' }}>
              <Grid className='auth_input btn90px'>
                <input
                  type='text'
                  name='auth'
                  maxLength='6'
                  placeholder='인증번호 입력'
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                  }
                />
                <p id='timer'></p>
              </Grid>
              <button type='button' className='mud_semi' id='chkBtn'>
                확인
              </button>
              <p className='error_msg'>인증번호를 확인하세요</p>
            </Grid>

            <Grid style={{ display: 'none' }} id='passDiv'>
              <p className='send_msg show'></p>
              <Grid className='sub_panel show'>
                <Grid
                  className='input_wrap'
                  id='findIdDiv'
                  style={{ display: 'none' }}
                ></Grid>
              </Grid>
            </Grid>
          </fieldset>
          <Grid className='button_row nopadding mt30px'>
            <button type='button' className='mud_semi common_btn'>
              로그인하러 가기
            </button>
            <button type='button' className='mud_main common_btn'>
              메인으로 가기
            </button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default FindIdPw;

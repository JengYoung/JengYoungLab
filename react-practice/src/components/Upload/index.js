import React, {useRef, useState} from 'react';
import styled from '@emotion/styled';

const UploadContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`

const Input = styled.input`
  display: none;
`;

const Upload = ({ children, droppable, name, accept, value, onChange, ...props }) => {
  const [file, setFile] = useState(value);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = e => {
    const files = e.target.files;
    const changedFile = files[0];
    setFile(changedFile);
    onChange && onChange(changedFile)
  }

  const handleChooseFile = () => {
    inputRef.current.click();
  }

  const handleDragEnter = (e) => {
    if (!droppable) return;

    e.preventDefault(); // 브라우저 기본 이벤트 막기
    e.stopPropagation(); // 부모나 자식 컴포넌트로 이벤트 전파 방지

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }; // 드래그를 통해 내부로 들어왔을 경우

  const handleDragLeave = (e) => {
    if (!droppable) return;

    e.preventDefault(); // 브라우저 기본 이벤트 막기
    e.stopPropagation(); // 부모나 자식 컴포넌트로 이벤트 전파 방지

    setDragging(false);
  }; // 내부로부터 빠져나갔을 경우

  const handleDragOver = (e) => {
    if (!droppable) return;

    e.preventDefault(); // 브라우저 기본 이벤트 막기
    e.stopPropagation(); // 부모나 자식 컴포넌트로 이벤트 전파 방지
  }; // 이벤트를 나중에 전파되는 것을 막기 위해 

  const handleFileDrop = (e) => {
    if (!droppable) return;

    e.preventDefault(); // 브라우저 기본 이벤트 막기
    e.stopPropagation(); // 부모나 자식 컴포넌트로 이벤트 전파 방지

    const files = e.dataTransfer.files;
    const changedFile = files[0];
    setFile(changedFile);
    onChange && onChange(changedFile);
    setDragging(false);
  }; // 파일을 컴포넌트 위에 놓았을 때

  return (
    <UploadContainer 
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver} 
      {...props}
    >
      <Input 
        ref={inputRef} 
        type="file"
        accept={accept}
        onChange={handleFileChange}
      ></Input>
      { typeof children === 'function' ? children(file) : children }
    </UploadContainer>
  )
}

export default Upload

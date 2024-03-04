import styled from 'styled-components'

export const MainCon = styled.div`
  display: flex;
  flex-direction: column;
`
export const HeaderCon = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
  background-color: #f4f4f4;
`

export const Logo = styled.img`
  width: 150px;
  height: 30px;
  margin-bottom: 25px;
  padding-left: 20px;
`

export const Profile = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`

export const NavItems = styled.ul`
  height: 50px;
  width: 200px;
  display: flex;
  justify-content: space-around;
  list-style-type: none;
`
export const LogoutButton = styled.button`
  height: 30px;
  width: 100px;
  background-color: red;
  color: white;
  border-radius: 10px;
  border-width: 0px;
  font-size: 17px;
`

export const ModalContainer = styled.div`
  height: 100px;
  width: 300px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`
export const ModalButtons = styled.button`
  background-color: white;
  color: black;
  margin: 15px;
  border-radius: 7px;
`

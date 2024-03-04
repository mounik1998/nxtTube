import styled from 'styled-components'

export const BottomCon = styled.div`
  display: flex;
  width: 100%;
  height: 75vh;
  background-color: #f4f4f4;
`

export const VideosCon = styled.div`
  width: 80%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  background-color: #e2e8f0;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 20px;
`

export const ThumbnailImage = styled.img`
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

export const ProfileImage = styled.img`
  height: 30px;
  width: 30px;
  margin-top: 12px;
  margin-right: 7px;
`

export const ProfileAndDescriptionCon = styled.div`
  display: flex;
`
export const VideoItemCard = styled.li`
  width: 30%;
  box-shadow: 7px 7px 3px grey;
  border-radius: 5px;
  margin: 10px;
  background-color: white;
`

export const VideosList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`

export const Title = styled.p`
  font-size: 12px;
  text-decoration: none;
`

export const ViewsAndPublishedAt = styled.p`
  font-size: 10px;
  font-weight: 300;
  color: grey;
`

export const ChannelName = styled.p`
  color: grey;
  font-weight: 500;
  font-size: 10px;
`
export const TitleCard = styled.div`
  padding: 17px;
  padding-top: 0px;
  padding-bottom: 5px;
`
export const BannerCon = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 100%;

  padding: 15px;
  margin-bottom: 15px;
`

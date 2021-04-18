import { DEVICE_MOBILE } from '../../common/devices'

enum Device {
  MOBILE = 'mobile',
  DESKTOP = 'desktop'
}

const scrollToFormIfMobile = (device: Device) => {
  if (device === DEVICE_MOBILE) {
    const mainContent = document.getElementById('main')
    mainContent && mainContent.scrollIntoView()
  }
}

export default scrollToFormIfMobile

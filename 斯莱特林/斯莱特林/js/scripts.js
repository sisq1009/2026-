/**
 * 系统核心功能模块
 */
const MedSystem = (() => {

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
      window.location.href = 'login.html';
  }
  // 私有方法
  const initTooltips = () => {
    const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltips.map(el => new bootstrap.Tooltip(el))
  }

  const initSliders = () => {
    document.querySelectorAll('.comparison-slider').forEach(slider => {
      const divider = slider.querySelector('.divider')
      const beforeImage = slider.querySelector('img:last-child')

      const moveHandler = e => {
        const rect = slider.getBoundingClientRect()
        let pos = (e.clientX - rect.left) / rect.width * 100
        pos = Math.max(0, Math.min(pos, 100))
        divider.style.left = `${pos}%`
        beforeImage.style.width = `${pos}%`
      }

      divider.addEventListener('mousedown', e => {
        e.preventDefault()
        document.addEventListener('mousemove', moveHandler)
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', moveHandler)
        }, { once: true })
      })
    })
  }

  // 公共接口
  return {
    init: () => {
      // 基础初始化
      initTooltips()
      initSliders()

      // 动态加载内容
      document.querySelectorAll('[data-load]').forEach(el => {
        fetch(el.dataset.load)
          .then(res => res.text())
          .then(html => el.innerHTML = html)
      })

      console.log('System initialized 🚀')
    }
  }
})()

// 文档加载后初始化
document.addEventListener('DOMContentLoaded', MedSystem.init)
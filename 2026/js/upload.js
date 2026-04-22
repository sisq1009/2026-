/**
 * 文件上传处理模块
 */
class UploadManager {
  constructor(dropZoneId) {
    this.dropZone = document.getElementById(dropZoneId)
    this.fileInput = this.dropZone.querySelector('input[type="file"]')
    this.progressBar = this.dropZone.querySelector('.progress-bar')
    this.initEvents()
  }

  initEvents() {
    // 拖放事件
    this.dropZone.addEventListener('dragover', e => {
      e.preventDefault()
      this.dropZone.classList.add('dragover')
    })

    this.dropZone.addEventListener('dragleave', () => {
      this.dropZone.classList.remove('dragover')
    })

    this.dropZone.addEventListener('drop', e => {
      e.preventDefault()
      this.handleFiles(e.dataTransfer.files)
    })

    // 文件选择事件
    this.fileInput.addEventListener('change', e => {
      this.handleFiles(e.target.files)
    })
  }

  handleFiles(files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = e => this.createThumbnail(file, e.target.result)
      reader.readAsDataURL(file)
    })
  }

  createThumbnail(file, dataUrl) {
    const thumbnail = document.createElement('div')
    thumbnail.className = 'thumbnail-item'
    thumbnail.innerHTML = `
      <img src="${dataUrl}" alt="${file.name}">
      <div class="file-info">
        <small>${file.name}</small>
        <small>${(file.size/1024/1024).toFixed(2)}MB</small>
      </div>
    `
    document.getElementById('fileList').appendChild(thumbnail)
  }

  static simulateUpload() {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      this.progressBar.style.width = `${progress}%`
      if(progress >= 100) {
        clearInterval(interval)
        this.progressBar.classList.add('bg-success')
      }
    }, 300)
  }
}

// 使用示例
const uploader = new UploadManager('dropZone')
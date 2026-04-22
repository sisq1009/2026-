/* 分析页特有样式 */
.annotation-marker {
  position: absolute;
  width: 15px;
  height: 15px;
  background: rgba(231,76,60,0.8);
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.annotation-marker:hover {
  transform: scale(1.3);
}

.medical-viewer {
  background: linear-gradient(45deg, #f8f9fa, #ecf0f1);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.diagnosis-panel {
  border-left: 4px solid var(--primary-color);
  background: white;
  border-radius: 0 12px 12px 0;
}
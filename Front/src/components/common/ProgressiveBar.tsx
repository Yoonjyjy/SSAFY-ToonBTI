import React, { useEffect, useState } from 'react'
import { Progress } from 'antd'

interface ProgressiveBarProps {
  progress?: number
}

const ProgressiveBar: React.FC = ({ progress }: ProgressiveBarProps) => {
  return (
    <>
      <Progress percent={progress} status="active" />
    </>
  )
}

export default ProgressiveBar

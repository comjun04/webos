import { FC } from 'react'
import { MdLogoDev } from 'react-icons/md'

import Window from '../../Window'
import Application from '../../structures/Application'

const TestApp: FC = () => {
  return (
    <Application id="testapp" name="Test Application" icon={MdLogoDev}>
      <Window id="main" title="This is a title">
        <div>Hello World in WebOS!</div>
      </Window>
    </Application>
  )
}

export default TestApp

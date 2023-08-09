import { capitalize } from 'lodash'
import { FC, memo } from 'react'
import { LangIds, LANG_ID_TO_LANG_NAME_MAP } from '../../../../Models/ProgrammingLanguage'
import Tab from '../../../UI/Tabs/Tab'
import TabList, { TabListProps } from '../../../UI/Tabs/TabList'

interface ProgrammingLanguageTabListProps extends Omit<TabListProps, 'children'> {
  languageIds: LangIds[]
  togglePreview?: () => void
}

const ProgrammingLanguageTabList: FC<ProgrammingLanguageTabListProps> = ({ languageIds, togglePreview, ...rest }) => {
  return (
    <TabList {...rest} className={`max-w-screen-md min-w-[14rem] grow`}>
      {languageIds.map((id) => (
        <Tab onClick={togglePreview} key={id}>
          {capitalize(LANG_ID_TO_LANG_NAME_MAP.get(id))}
        </Tab>
      ))}
    </TabList>
  )
}

export default memo(ProgrammingLanguageTabList)

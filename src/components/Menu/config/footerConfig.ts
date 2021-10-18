import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: '/',
      },
      {
        label: t('Community'),
        href: '/',
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: '',
      },
      {
        label: t('Troubleshooting'),
        href: '',
      },
      {
        label: t('Guides'),
        href: '',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: t('Documentation'),
        href: '',
      },
    ],
  },
]

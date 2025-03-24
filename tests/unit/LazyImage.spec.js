import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LazyImage from '@/components/LazyImage.vue'

describe('LazyImage.vue', () => {
  let intersectionObserverCallback
  const mockDisconnect = jest.fn()
  const mockIntersectionObserver = jest.fn(callback => {
    intersectionObserverCallback = callback
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: mockDisconnect
    }
  })

  beforeAll(() => {
    window.IntersectionObserver = mockIntersectionObserver
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders placeholder initially', () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test-image.jpg',
        alt: 'Test image',
        height: '200px'
      }
    })

    expect(wrapper.find('img').attributes('src')).toBeFalsy()
    expect(wrapper.find('img').attributes('alt')).toBe('Test image')
    expect(wrapper.find('.lazy-image__loading')).toBeTruthy()
  })

  it('loads image when intersecting', async () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test-image.jpg',
        alt: 'Test image',
        height: '200px'
      }
    })

    intersectionObserverCallback([{ isIntersecting: true }])
    await nextTick()

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('test-image.jpg')
    expect(wrapper.find('.lazy-image__loading')).toBeTruthy()
  })

  it('shows loaded state after image loads', async () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test-image.jpg',
        alt: 'Test image',
        height: '200px'
      }
    })

    intersectionObserverCallback([{ isIntersecting: true }])
    await nextTick()
    
    await wrapper.find('img').trigger('load')
    await nextTick()
    
    expect(wrapper.find('.lazy-image__loading').exists()).toBe(false)
  })

  it('shows error state when image fails to load', async () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'invalid-image.jpg',
        alt: 'Test image',
        height: '200px'
      }
    })

    intersectionObserverCallback([{ isIntersecting: true }])
    await nextTick()

    await wrapper.find('img').trigger('error')
    await nextTick()

    expect(wrapper.find('.lazy-image__loading').exists()).toBe(false)
  })

  it('updates image when src changes', async () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test-image-1.jpg',
        alt: 'Test image',
        height: '200px'
      }
    })

    intersectionObserverCallback([{ isIntersecting: true }])
    await nextTick()

    await wrapper.find('img').trigger('load')
    await nextTick()

    await wrapper.setProps({ src: 'test-image-2.jpg' })
    await nextTick()

    expect(wrapper.find('.lazy-image__loading')).toBeTruthy()
  })

  it('cleans up observer on unmount', () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test-image.jpg',
        alt: 'Test image',
        height: '200px'
      }
    })

    wrapper.unmount()
    expect(mockDisconnect).toHaveBeenCalled()
  })
})

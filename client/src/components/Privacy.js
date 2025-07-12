import React from 'react';
import '../styles/Privacy.css';

const Privacy = () => {
  // 获取当前年份
  const currentYear = new Date().getFullYear();
  
  // 最后更新日期
  const lastUpdated = '2023年12月15日';
  
  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-header">
          <h1>隐私政策</h1>
          <p className="last-updated">最后更新: {lastUpdated}</p>
        </div>
        
        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. 引言</h2>
            <p>
              欢迎访问时间胶囊（"我们"、"我们的"或"本网站"）。我们重视您的隐私，并致力于保护您的个人信息。
              本隐私政策旨在向您说明我们如何收集、使用、披露和保护您的个人信息。
            </p>
            <p>
              使用我们的服务即表示您同意本隐私政策中描述的数据实践。如果您不同意本政策的任何部分，
              请不要使用我们的服务或提供您的个人信息。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>2. 信息收集</h2>
            <p>我们可能会收集以下类型的信息：</p>
            
            <h3>2.1 您提供的信息</h3>
            <p>
              当您注册账户、创建时间胶囊、填写表单或与我们的服务互动时，我们会收集您提供的信息，包括：
            </p>
            <ul>
              <li>个人识别信息（如姓名、电子邮件地址、电话号码）</li>
              <li>账户信息（如用户名和密码）</li>
              <li>您创建的时间胶囊内容（如文本、图片、视频）</li>
              <li>收件人信息（如电子邮件地址）</li>
              <li>您通过客户支持或其他渠道与我们沟通时提供的信息</li>
            </ul>
            
            <h3>2.2 自动收集的信息</h3>
            <p>
              当您访问或使用我们的服务时，我们可能会自动收集某些信息，包括：
            </p>
            <ul>
              <li>设备信息（如设备类型、操作系统、浏览器类型）</li>
              <li>日志信息（如IP地址、访问时间、访问页面）</li>
              <li>位置信息（如通过IP地址确定的大致位置）</li>
              <li>Cookie和类似技术收集的信息</li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>3. 信息使用</h2>
            <p>我们可能会将收集的信息用于以下目的：</p>
            <ul>
              <li>提供、维护和改进我们的服务</li>
              <li>处理和传递您的时间胶囊</li>
              <li>创建和管理您的账户</li>
              <li>响应您的请求和提供客户支持</li>
              <li>发送服务通知和更新</li>
              <li>防止欺诈和增强安全性</li>
              <li>进行分析和研究以改进我们的服务</li>
              <li>遵守法律义务</li>
            </ul>
          </section>
          
          <section className="privacy-section">
            <h2>4. 信息共享</h2>
            <p>
              我们重视您的隐私，不会出售您的个人信息。但在某些情况下，我们可能会与以下各方共享您的信息：
            </p>
            
            <h3>4.1 服务提供商</h3>
            <p>
              我们可能会与帮助我们提供服务的第三方服务提供商共享信息，如云存储提供商、电子邮件服务提供商和分析服务提供商。
              这些服务提供商仅能出于提供服务的目的使用您的信息，并受到保密义务的约束。
            </p>
            
            <h3>4.2 法律要求</h3>
            <p>
              如果法律要求或为了响应有效的法律程序（如搜查令、法院命令或传票），我们可能会披露您的信息。
            </p>
            
            <h3>4.3 保护权利</h3>
            <p>
              我们可能会披露信息以保护我们的权利、财产或安全，以及我们的用户或公众的权利、财产或安全。
            </p>
            
            <h3>4.4 业务转让</h3>
            <p>
              如果我们参与合并、收购或资产出售，您的信息可能会作为交易的一部分被转让。
              在这种情况下，我们会通知您并说明您的选择。
            </p>
            
            <h3>4.5 经您同意</h3>
            <p>
              我们可能会在获得您的同意后与其他方共享您的信息。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>5. 数据安全</h2>
            <p>
              我们实施了适当的技术和组织措施来保护您的个人信息免受意外丢失、未经授权的访问、使用、更改和披露。
              这些措施包括加密、访问控制和安全审计。
            </p>
            <p>
              然而，没有任何互联网传输或电子存储方法是100%安全的。因此，虽然我们努力使用商业上可接受的方式保护您的个人信息，
              但我们不能保证其绝对安全。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>6. 数据保留</h2>
            <p>
              我们会在实现本隐私政策中概述的目的所需的时间内保留您的个人信息，除非法律要求或允许更长的保留期限。
              对于时间胶囊内容，我们会按照您设定的发送日期保留，并在成功传递后的合理时间内删除。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>7. 您的权利</h2>
            <p>根据您所在地区的适用法律，您可能拥有以下权利：</p>
            <ul>
              <li>访问您的个人信息</li>
              <li>更正不准确的个人信息</li>
              <li>删除您的个人信息</li>
              <li>限制或反对处理您的个人信息</li>
              <li>数据可携带性</li>
              <li>撤回同意</li>
            </ul>
            <p>
              如果您想行使这些权利，请通过本政策末尾提供的联系方式与我们联系。
              我们将在适用法律规定的时间框架内回应您的请求。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>8. 儿童隐私</h2>
            <p>
              我们的服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
              如果您发现我们可能收集了13岁以下儿童的个人信息，请立即联系我们，我们将采取措施删除这些信息。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>9. Cookie政策</h2>
            <p>
              我们使用Cookie和类似技术来增强您的浏览体验、分析网站流量和个性化内容。
              您可以通过浏览器设置控制Cookie的使用。然而，禁用Cookie可能会影响我们服务的某些功能。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>10. 第三方链接</h2>
            <p>
              我们的服务可能包含指向第三方网站或服务的链接。我们对这些第三方的隐私实践不负责任。
              我们建议您查看您访问的任何第三方网站或服务的隐私政策。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>11. 隐私政策更新</h2>
            <p>
              我们可能会不时更新本隐私政策。当我们进行重大更改时，我们会在网站上发布更新后的政策，
              并更新页面顶部的"最后更新"日期。我们也可能会通过其他方式通知您，如发送电子邮件或在我们的网站上发布通知。
            </p>
            <p>
              我们鼓励您定期查看本隐私政策，以了解我们如何保护您的信息。
            </p>
          </section>
          
          <section className="privacy-section">
            <h2>12. 联系我们</h2>
            <p>
              如果您对本隐私政策有任何问题、意见或请求，请通过以下方式联系我们：
            </p>
            <div className="contact-info">
              <p>电子邮件：privacy@timecapsule.com</p>
              <p>地址：深圳市南山区科技园高新南七道数字大厦8楼</p>
              <p>电话：+86 123 4567 8910</p>
            </div>
          </section>
        </div>
        
        <div className="privacy-footer">
          <p>&copy; {currentYear} 时间胶囊 | 保留所有权利</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;